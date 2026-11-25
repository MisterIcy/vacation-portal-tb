@echo off
REM Vacation Portal Project Control Script (Windows)
REM Usage: run.bat [build|start|teardown|check]

SETLOCAL ENABLEEXTENSIONS
SET PROJECT_NAME=vacation-portal
SET COMPOSE_FILE=compose.yml
SET BE_CONTAINER=vacation_be
SET FE_CONTAINER=vacation_fe
SET BE_WORKING_DIR=/var/www/html/be
SET FE_WORKING_DIR=/app

SET DOCKER_COMPOSE=docker compose -p %PROJECT_NAME% -f %COMPOSE_FILE%
SET DOCKER_BACKEND=docker exec -w %BE_WORKING_DIR% -it %BE_CONTAINER%
SET DOCKER_FRONTEND=docker exec -w %FE_WORKING_DIR% -it %FE_CONTAINER%

IF "%1"=="build" GOTO build
IF "%1"=="start" GOTO start
IF "%1"=="teardown" GOTO teardown
IF "%1"=="check-be" GOTO check-be
IF "%1"=="check-fe" GOTO check-fe
GOTO usage

:build
ECHO [BUILD] Starting Docker Compose...
%DOCKER_COMPOSE% build
%DOCKER_COMPOSE% up -d
REM ECHO [BUILD] Installing Composer dependencies in BE container...
REM %DOCKER_BACKEND% composer install
ECHO [BUILD] Running DB migrations...
%DOCKER_BACKEND% composer db:migrate
ECHO [BUILD] Seeding DB...
%DOCKER_BACKEND% composer db:seed
ECHO [BUILD] Build complete.
%DOCKER_COMPOSE% down
GOTO end

:start
ECHO [START] Starting Docker Compose...
%DOCKER_COMPOSE% up
ECHO [START] Project started.
GOTO end

:teardown
ECHO [TEARDOWN] Stopping and removing Docker Compose services and volumes...
%DOCKER_COMPOSE% down -v
ECHO [TEARDOWN] Project and volumes stopped and removed.
GOTO end

:check-be
ECHO [CHECK] Running all checks in BE container...
%DOCKER_BACKEND% composer check:all
GOTO end

:check-fe
ECHO [CHECK] Running all checks in FE container...
%DOCKER_FRONTEND% npm run validate
%DOCKER_FRONTEND% npm run test -- --run
GOTO end

:usage
ECHO Usage: run.bat [build^|start^|teardown^|check-be^|check-fe]
EXIT /B 1

:end
ENDLOCAL

