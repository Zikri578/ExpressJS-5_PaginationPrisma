# ExpressJS-5_PaginationPrisma

Pagination adalah proses untuk memecah data dalam jumlah yang besar menjadi beberapa halaman yang lebih kecil dan lebih mudah ditampilkan. Dalam pengembangan aplikasi web, pagination sangat berguna ketika menampilkan data dari database dalam jumlah yang besar, seperti data produk dalam toko online, data artikel dalam blog, dan sebagainya.

Prisma adalah sebuah ORM (Object-relational mapper) atau library yang digunakan untuk membuat query database dalam aplikasi Express.js. Prisma memudahkan proses query database dengan menyediakan sebuah query language yang disebut Prisma Client.

Prisma menyediakan fitur pagination yang bisa digunakan untuk mengimplementasikan pagination pada data yang diambil dari database. Prisma menyediakan 2 opsi pagination yaitu `skip` dan `take`.

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    app.get('/users', async (req, res) => {
        const page = req.query.page || 1;
        const perPage = 10;
        const users = await prisma.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
        });
        res.send(users)
    });

Pada contoh diatas, variable `page` digunakan untuk menentukan halaman yang ingin ditampilkan, variable `perPage` digunakan untuk menentukan jumlah data yang ingin ditampilkan dalam satu halaman, dan kemudian dengan menggunakan `skip` dan `take` dalam query Prisma maka akan diambil data sesuai dengan halaman yang ditentukan.

Selain menggunakan `skip` dan `take`, Prisma juga menyediakan fungsi `cursor based pagination` dimana anda dapat mengambil data berdasarkan pointer yang ditentukan, hal ini sangat berguna untuk pagination data yang di update secara realtime.

Selain itu, selalu ingat untuk mengecek parameter yang diterima dari client dan melakukan validasi sesuai dengan harapan, karena input dari client selalu rawan terhadap serangan SQL injection.

Pagination menggunakan Prisma akan memudahkan proses pengambilan data dari database dan menampilkan data dalam jumlah yang sesuai dengan kebutuhan. Namun pastikan untuk selalu melakukan validasi dan tidak lupa untuk menambahkan fitur seperti sort, filter untuk memudahkan proses pengambilan data.

Selain itu, jika anda menggunakan prisma dalam aplikasi anda, anda juga dapat menggunakan feature `Connections` dari prisma untuk pagination, yang menyediakan fitur-fitur seperti total halaman, total data, dll. Connections dari prisma akan memberikan anda informasi lebih lengkap dan detail dari data yang diambil, sehingga anda dapat menampilkan informasi yang sesuai dalam aplikasi anda. Contohnya, untuk menggunakan connections:

    app.get('/users', async (req, res) => {
        const { page, perPage } = req.query;
        const users = await prisma.user.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            select: {
                connections: true
            }
        });
        res.send(users)
    });

Secara umum, menggunakan pagination menggunakan Prisma dalam Express.js dapat membantu dalam menampilkan data dari database dalam jumlah yang sesuai dengan kebutuhan. Selain itu, dengan menggunakan connections dari prisma, memudahkan proses pengambilan data dan menyediakan informasi yang detail dari data yang diambil.
