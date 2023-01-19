"use strict";

/* 
    data structure :
    data is arranged in arrays like in a database;
    First row is title row.
*/

class Table {
    /* A table is a two dimentional array
        It haves a row of data that serves as title for the rest of data.
    */

    constructor() {
        this.columns = [];
        for (let a = 0; a < arguments.length; a++) {
            this.columns.push(arguments[a]);
            this[arguments[a]] = [];
        }
    }

    push() {//try to fit the arguments list into the column
        //if the number of arguments isn't a multiple of the number of 
        if (arguments.length % this.columns.length != 0) {
            console.error(
                "EXCEPTION : length of arguments did not match or isn't proportional to table width in Table.prototype.push()"
            );
            return;
        }

        for (let a = 0; a < arguments.length; a++) {
            this[this.columns[a % this.columns.length]].push(arguments[a]);
        }
    }

    toArray(){
        const result = [];
        for(let a=0; a<this.length(); a++){
            const resultLine = [];
            this.columns.forEach((col) => {
                resultLine.push(this[col][a]);
            })
            result.push(resultLine);
        }

        return result;
    }

    getColumn(column) {
        return this[column];
    }

    getLine(index) {
        const result = [];
        this.columns.forEach((col) => {
            result.push(this[col][index]);
        });

        return result;
    }

    length(){
        return this[this.columns[0]].length;
    }

    getMatch(
        search //the item that will be STRICT searched within the table
    ) {
        const resultIndexes = []; //array that will receive the index of the retults of the research
        const results = []; //array that will receive the results of the research
        const searchColumns = []; //array of columns names that will be searched, if empty all will be searched

        //We create the array of column by getting any arguments after the first
        for (let a = 1; a < arguments.length; a++) {
            searchColumns.push(arguments[a]);
        }
        //If there is none we search for all columns
        if ((searchColumns.length === 0)) {
            searchColumns.push(...this.columns);
        }

        //Now we start to search
        searchColumns.forEach(columnName => {
            for(let a=0; a < this.length(); a++){
                if(this[columnName][a] === search){
                    //indexes can't be pushed twice
                    if(!resultIndexes.includes(a)) {
                        resultIndexes.push(a)};
                }
            }
        });

        //Now we get the data corresponding to the columns
        resultIndexes.forEach((index) => {
            results.push(this.getLine(index));
        })

        return results;
    }
}

const recipes = new Table("name", "time");
const items = new Table("name");
const input = new Table("recipeID", "itemID", "itemQuantity");
const output = new Table("recipeID", "itemID", "itemQuantity");

recipes.push(
    'ironOre', 1,
    'ironIngot', 2,
    'ironPlate', 6,
    'ironRod', 4,
    'screws', 4,
    'reinforcedIronPlate', 15
)

items.push(
    'ironOre',
    'ironIngot',
    'ironPlate',
    'ironRod',
    'screws',
    'reinforcedIronPlate'
)

input.push(
    'ironIngot', 'ironOre', 1,
    'ironPlate', 'ironIngot', 3,
    'ironRod', 'ironIngot', 1,
    'screws', 'ironRod', 1,
    'reinforcedIronPlate', 'ironPlate', 6,
    'reinforcedIronPlate', 'screws', 16
)

output.push(
    'ironIngot', 'ironIngot', 1,
    'ironPlate', 'ironPlate', 1,
    'ironRod', 'ironRod', 1,
    'screws', 'screws', 4,
    'reinforcedIronPlate', 'ironPlate', 6,
    'reinforcedIronPlate', 'screws', 16
)