#/bin/sh

echo "======= Installing server dependecies ======="
yarn install

echo "======= Starting server ======="
yarn run start-with-nodemon &

echo "======= Installing client dependecies ======"
cd src/client
yarn install 

echo "======= Starting Client ======="
yarn start