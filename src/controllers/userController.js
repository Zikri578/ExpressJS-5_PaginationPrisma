import db from "../../prisma/connection.js";
import { request, response } from "express";

// membuat data user
export const user_create = async (req = request, res = response) => {
    try {
        // membuat variabel data yang isinya permintaan body
        const data = await req.body

        // membuat variabel createUser yang isinya mengambil database user yang akan dibuat
        const createUser = await db.users.create(
            {
                // mengambil variabel data yang ada diatas
                data: data,
            }
        );

        // mengembalikan permintaan status kedalam bentuk json
        return res.status(201).json(
            {
                // menampilkan pesan bahwa data berhasil dibuat
                success: true,
                message: "Data User Berhasil Dibuat..",
            }
        );

    } catch (error) {

        // mengembalikan respons kedalam bentuk json
        return res.status(501).json(
            {
                // menampilkan pesan bahwa data tidak berhasil dibuat
                success: false,
                message: error.message,
            }
        );

    }
}

// membaca data user
export const user_read = async (req = request, res = response) => {
    try {
        // cara 1 : membuat objek page dengan valuenya 1 dan limit valuenya 10 yang nilainya dimasukkan query (hasilnya : string)
        let { page = 1, limit = 10 } = req.query;

        // cara 2 
        // let { page, limit } = req.query;

        // membuat variabel skip
        let skip = (page - 1) * limit;

        // membuat variabel result untuk mengambil variabel db serta mencari data
        const result = await db.users.findMany(
            {
                // untuk mengambil data dengan diubah tipe datanya menjadi int serta memanggil objek limit
                take: parseInt(limit),

                // memanggil variabel skip data serta menampilkan hasil
                skip: skip,
            }
        )

        // mendapatkan informasi total data keseluruhan
        const resultCount = await db.users.count();     // int jumlah total data users

        // melakukan generate total page untuk menghitung page
        const totalPage = Math.ceil(resultCount / limit);

        // mengembalikan status pesan berhasil
        return res.status(200).json(
            {
                success: true,

                // posisi page sekarang ini
                current_page: parseInt(page),

                // menghitung total page
                total_page: totalPage,

                // menghitung total data
                total_data: resultCount,

                message: result,
            }
        )
    } catch (error) {
        // mengembalikan status pesan gagal
        return res.status(500).json(
            {
                success: false,
                error: error.message,
            }
        )
    }
}

