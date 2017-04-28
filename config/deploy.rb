# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "tomato"
set :repo_url, "https://github.com/aiasfina/tomato.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/tomato"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

append :linked_files, ".env", "db/production.sqlite3"
# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "processes"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  task :start do
    on roles(:app) do
      execute :eye, "start app"
    end
  end

  task :stop do
    on roles(:app) do
      execute :eye, "stop app"
    end
  end

  task :restart do
    on roles(:app) do
      execute :eye, "restart app"
    end
  end

  desc "Start or reload eye config"
  task :load_eye do
    on roles(:app) do
      execute :eye, "load config/app.eye"
    end
  end

end

before "deploy:restart", "deploy:load_eye"
