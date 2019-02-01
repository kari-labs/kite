FROM redis:5.0.3-alpine

COPY ./kite-redis.conf /etc/kite-redis.conf

EXPOSE 6379
CMD ["redis-server", "/etc/kite-redis.conf"]