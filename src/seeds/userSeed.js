import express from "express";
import { faker } from "@faker-js/faker";
import db from "../../prisma/connection.js";


// membuat fake data
// membuat variabel fake username
// const fake_username = faker.internet.userName();
// const fake_email = faker.internet.email();
// const fake_password = faker.internet.password();
// // membuat fake data

// // menampilkan fake data
// console.log({ fake_email, fake_username, fake_password });

// menjalankan output dengan perintah : npm run userSeed sesuai yang ada di package.json dibagian scripts

// membuat variabel user_seeds
const user_seed = () => {
    // membuat variabel fake username
    const fake_username = faker.internet.userName();

    // membuat variabel fake email
    const fake_email = faker.internet.email();

    // membuat variabel fake password
    const fake_password = faker.internet.password();

    // mamasukkan kedalam database
    db.users.create(
        {
            data: {
                username: fake_username,
                email: fake_email,
                password: fake_password,
            },
        }
    )
        .then((res) => {
            // menampilkan pesan ketika datanya sudah berhasil masuk ke database
            console.info(`Username : ${res.username}, email : ${res.email}, password : ${res.password} Berhasil dibuat`);
        })
        .catch((err) => {
            // menampilkan pesan ketika datanya tidak berhasil masuk ke database
            console.info(err.message);
        })
}

// melakukan perulangan data ketika mau sampai 100
for (let i = 0; i <= 100; i++) {
    // memanggil variabel
    user_seed();
}