require 'rails'
require 'timeout'
require 'listen'

module RailsWebpack
  class WebpackWatcher
    class << self

      attr_accessor :logger_thread, :err_read, :out_read, :out_write, :err_write, :listener

      def command
        %w(webpack --config config/webpack.config.js --watch)
      end

      def env
        { 'NODE_ENV' => Rails.env }
      end

      def options
        {
          out: out_write,
          err: err_write,
        }
      end

      def pid_file_path
        Rails.root.join('tmp/pids/webpack.pid')
      end

      def pid
        File.read(pid_file_path).to_i
      end

      def pid=(value)
        File.write(pid_file_path, value)
      end

      def delete_pid
        File.delete(pid_file_path) if File.exists?(pid_file_path)
      end

      def close_pipes
        out_write.close unless out_write.closed?
        err_write.close unless err_write.closed?
      end

      def start
        # Create pipes
        self.err_read, self.err_write = IO.pipe
        self.out_read, self.out_write = IO.pipe

        self.pid = Process.spawn(env, *command, options)

        # Close input pipes
        out_write.close
        err_write.close
      end

      def stop(wait_for = 5)
        return unless is_running?

        Timeout.timeout(wait_for) do
          Process.kill('INT', pid)
          Process.wait(pid)
        end

      rescue Timeout::Error
        Process.kill('TERM', pid)
        Process.wait(pid)

      ensure
        silence_logs
        close_pipes
        delete_pid
      end

      def restart(wait_for = 5)
        stop(wait_for) and start
      end

      def listen_logs
        self.logger_thread = Thread.new do
          Rails.logger.info(out_read.readline) until out_read.eof?
          Rails.logger.error(err_read.readline) until err_read.eof?
        end
      end

      def silence_logs
        logger_thread.exit if logger_thread and logger_thread.status
      end

      def watch
        # Do nothing if webpack is already running
        raise WebpackWatcherAlreadyRunning if is_running?

        start
        listen_logs

        self.listener = Listen.to(Rails.configuration.webpack.watch_paths) do |_, added, removed|
          if added.length > 0 or removed.length > 0
            Rails.logger.info 'Restarting webpack ...'

            restart
            listen_logs
          end
        end

        listener.start
      end

      def unwatch
        listener.stop if listener
        stop
      end

      def is_running?
        Process.getpgid(pid).integer? rescue false
      end
    end
  end
end
