FROM node:12

COPY ./ ./app

RUN cd ./app; npm install

ENV PORT=3000
ENV DB_CNN=mongodb+srv://MEAN_USER:5GrvXHXyNDG6jKyC@mycluster.qyn01.mongodb.net/testDataBase
ENV SECRET_JWT_SEED=EstoDeB3Serc0mPl1cAdisizi<1M0

EXPOSE 3000

CMD ["node", "./app"]