const Hapi = require('@hapi/hapi');



require('./database');

const Task = require('./models/Task')

const init = async() => {

    const server = new Hapi.server({

        port: 4000,
        host: 'localhost'

    });

    server.route({
        method: 'POST',

        path: '/tasks',

        handler: async(request, h) => {

            const task = new Task(request.payload);
            const taskSaved = await task.save();
            return h.response(taskSaved);
        }

    })


    server.route({
        method: 'GET',

        path: '/total',

        handler: async(request, h) => {
            try {
                const tasks = await Task.find()
                return h.response(tasks)


            } catch (error) {
                return h.response(error).code(500)

            }

        }

    })



    server.route({
        method: 'GET',

        path: '/byID/{id}',

        handler: async(request, h) => {
            try {
                const task = await Task.findById(request.params.id)
                return h.response(task)


            } catch (error) {
                return h.response(error).code(500)

            }

        }

    })


    //buscar por nombre

    server.route({
        method: 'GET',

        path: '/names/{name}',

        handler: async(request, h) => {
            try {
                const task = await Task.find({ "name": request.params.name })
                return h.response(task)


            } catch (error) {
                return h.response(error).code(500)

            }

        }

    })

    //buscar por descripcion

    server.route({
        method: 'GET',

        path: '/desc/{description}',

        handler: async(request, h) => {
            try {
                const task = await Task.find({ "description": request.params.description })
                return h.response(task)


            } catch (error) {
                return h.response(error).code(500)

            }

        }

    })



    await server.start();
    console.log(`server running on port ${server.info.uri}`)

};
init();