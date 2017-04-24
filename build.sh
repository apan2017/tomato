RAILS_ENV=production
docker-compose build
docker-compose run app rails db:setup RAILS_ENV=$RAILS_ENV
docker-compose run app /var/www/bin/webpack RAILS_ENV=$RAILS_ENV
docker-compose run app rails assets:precompile RAILS_ENV=$RAILS_ENV
docker-compose up
