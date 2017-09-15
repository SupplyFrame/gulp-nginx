# Gulp nginx

Launch nginx in the user space (not using root) from gulp.

## How to Use

First, you need to install nginx.  If you're working on a linux machine, you can probably 
execute the following command to get a version of nginx.

    sudo apt-get install nginx

Second, you need a configuration file.  nginx has many options baked in it's built.  The
only one that I haven't been able to override is the default error log (I can do an additional
error log).  If you can show me how to fix that, please submit a pull request.


    #This is a minimalist nginx configuration file that might be an appropriate starting point for dev work
    #This file was not developed with the intent of being used on a production environment.
    #user nobody nogroup;
            worker_processes 1;

            pid        logs/nginx.pid;
            error_log  logs/error.log error;

            events {
              worker_connections 512;
            }
            http {
              include    mime.types;
              access_log logs/access.log;
              log_format   main '$remote_addr - $remote_user [$time_local]  $status '
                '"$request" $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';

              server {
                listen *:8000;
                server_name "";

                location / {
                  root public/;
                }
              }
            }

Third, you need to ensure that any directories and files referenced in your config file exist.  By default, 
gulp-nginx sets the nginx prefix (similar to working directory) to the current working directory.
Gulp temporarily resets the pwd, so the paths are all relative to the folder containing your
gulpfile.

The example config file above requires logs/ to exist and also looks for a an additional config file
mime.types.  If you want to use this file, use the following command to locate the mime.types file
that you already have on your system.  If you have multiple options, choose the one under an nginx
folder.

    locate mime.types

Fourth, ensure that nginx is in your path.  If it isn't, you can still use this library by passing
the fullPath to nginx in the runNginx command, but it will be simpler if nginx is in your path.

Last, you can call nginx from your gulp tasks.  This library exposes three functions:
    
    startNginx(configFile)
    stopNginx(configFile)
    runNginx(configFile, {additionalArgs, fullPath})

startNginx and stopNginx do what you would expect.  configFile is always required.  All three of the
functions always return a promise the will be resolved once the nginx process has finished execution, 
which usually happens very quickly.

Nginx lets you administer multiple aspects of its execution by running nginx with different
arguments.  For example, stopNginx runs nginx with the additionArguments of -s and stop.  Executing
the following commnand will show you many of the options.

    nginx -h

Most users will not need to call runNginx directly.

## License

This library is available under the MIT license.
