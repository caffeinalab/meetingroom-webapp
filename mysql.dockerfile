FROM mariadb:10.3

COPY sql/* /docker-entrypoint-initdb.d/