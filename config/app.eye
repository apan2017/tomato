BUNDLE = 'bundle'

ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))
WORKDIR = File.join(ROOT, 'processes')

Eye.config do
  logger "#{WORKDIR}/eye.log"
end

Eye.application :app do
  load_env "#{ROOT}/.env"

  working_dir WORKDIR
  trigger :flapping, times: 10, within: 1.minute

  process :puma do
    daemonize true
    pid_file "#{WORKDIR}/puma.pid"
    stdall "#{WORKDIR}/puma.log"

    working_dir ROOT
    start_command "#{BUNDLE} exec puma -C config/puma.rb"
    stop_signals [:TERM, 5.seconds, :KILL]
    restart_command 'kill -USR2 {PID}'

    # just sleep this until process get up status
    # (maybe enought to puma soft restart)
    restart_grace 10.seconds

    check :cpu, every: 30, below: 80, times: 3
    check :memory, every: 30, below: 70.megabytes, times: [3, 5]
  end
end