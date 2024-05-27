#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let list: string[] = [];
let inputItems = true;

async function addItem() {
    let item1 = await inquirer.prompt([{
        name: "input1",
        type: "input",
        message: chalk.blue("Input a task to add to your To-Do list:")
    }]);
    list.push(item1.input1);
    console.log(chalk.green.bold(`Added task: ${item1.input1}`));
}

async function removeItem() {
    if (list.length === 0) {
        console.log(chalk.red.bold("No tasks to remove."));
        return;
    }

    let itemToRemove = await inquirer.prompt([{
        name: "remove",
        type: "list",
        message: chalk.blue("Select a task to remove from your To-Do list:"),
        choices: list
    }]);
    list = list.filter(item => item !== itemToRemove.remove);
    console.log(chalk.green.bold(`Removed task: ${itemToRemove.remove}`));
}

async function viewList() {
    if (list.length === 0) {
        console.log(chalk.yellow.bold("Your to-do list is empty."));
    } else {
        console.log(chalk.green.bold(`Your list is:\n${list.map((task, index) => chalk.cyan(`${index + 1}. ${task}`)).join("\n")}`));
    }
}

async function main() {
    console.log(chalk.magenta.bold("\nWelcome to the To-Do List Manager!\n"));
    while (inputItems) {
        let action = await inquirer.prompt([{
            name: "action",
            type: "list",
            message: chalk.blue("What would you like to do?"),
            choices: [
                chalk.green("Add task"),
                chalk.red("Remove task"),
                chalk.yellow("View list"),
                chalk.gray("Exit")
            ]
        }]);

        switch (action.action) {
            case chalk.green("Add task"):
                await addItem();
                break;
            case chalk.red("Remove task"):
                await removeItem();
                break;
            case chalk.yellow("View list"):
                await viewList();
                break;
            case chalk.gray("Exit"):
                inputItems = false;
                console.log(chalk.magenta.bold("\nThank you for using the To-Do List Manager!"));
                break;
        }
    }
}

main();
