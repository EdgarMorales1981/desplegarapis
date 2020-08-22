const Hapi = require('@hapi/hapi');



require('./database');

const Task = require('./models/Task')

const init = async() => {

    const server = new Hapi.server({

        port: 3000,
        host: '142.93.127.135'

    });

    server.route({
        method: 'POST',

        path: '/tasks',

        handler: async(request, h) => {

            const task = new Task(request.payload);
            const taskSaved = await task.save();
            return h.response(taskSaved)


        }

    })


    server.route({
        method: 'GET',

        path: '/tasks',

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

        path: '/tasks/{id}',

        handler: async(request, h) => {
            try {
                const task = await Task.findById(request.params.id)
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