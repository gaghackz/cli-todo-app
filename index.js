const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const file = './todos.json';


program
    .name("CLI-TODO LIST TOOL")
    .description("lets you add todo list through terminal :D")
    .version("0.0.1");



program.command('add')
    .description('lets you add a task')
    .argument('<task>', 'adds a task')
    .action((task) => {

        fs.readFile(file,'utf8',(err,data) =>{

            if(err){
                console.log(err);
            }

            const todos = JSON.parse(data)

            let todosarray = [...todos];

            const dict_task = {

                id: todosarray.length+1,
                taskName: task

            };
            todosarray.push(dict_task);

            fs.writeFile(file,JSON.stringify(todosarray,undefined,2),(error) =>{
                if(error){
                    console.log("error writing to the file bro");
                } else{
                    console.log("task added :D");
                }
            });
        });
    });

program
    .command('delete')
    .description('deletes a command bro')
    .argument('<id>','id of task')
    .action((id) =>{

        fs.readFile(file,'utf8',(err,data) => {

            if(err){
                console.log("error reading file:", err)

            }

            const main_data = JSON.parse(data);
            let todos = [...main_data]

            todos.splice(id-1,1)

            for(let i = 0; i < todos.length; i++){

                todos[i].id = i+1;

            }

            fs.writeFile(file,JSON.stringify(todos, undefined, 2 ), (err) => {
                if(err){
                    console.log("error occured",err)

                }else{

                    console.log("succesfully deleted task :D")

                }
            });
        });
    });


program
    .command('list')
    .description('lists all the tasks')
    .action(()=>{

        fs.readFile(file,'utf8',(err,data)=>{

            if(err){
                console.log("error reading file: ", err)
            }


            let main_data = JSON.parse(data);
            let todos = [...main_data]

            if(todos.length>0){


                console.log("task_id" + " | " + "task_name")
                for(let i = 0; i<todos.length; i++){

                console.log( `${todos[i].id} | ${todos[i].taskName}`)

                }
            }else{

                console.log("add some tasks to the list bro :D")

            }

        })


    })




program.parse();