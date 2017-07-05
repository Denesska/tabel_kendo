/**
 * Created by d.gandzii on 7/3/2017.
 */

function Cars(model: string, type: string, doors: number, fuel: string, factYear: number, registered: boolean, impression: string) {
    this.model = model;
    this.type = type;
    this.doors = doors;
    this.fuel = fuel;
    this.factYear = factYear;
    this.registered = registered;
    this.age = function () {
        return new Date().getFullYear() - factYear;
    };
    this.impression = impression;

}

const BMW = new Cars("BMW", "touring", 5, "gasoline", 1993, true, "nice care");

const AUDI = new Cars("Audi", "avant", 3, "diesel", 2000, true, "not bad car");

$("#page1").html(`If I can choose from ${BMW.model} and ${AUDI.model} I would take the ${BMW.fuel} one!`);

function giveEm(): number {
    var base: number = 16;

    function calculate() : number {
        return screen.pixelDepth/base;
    }
    return calculate();
}

var small = giveEm();
/*var medium = giveEm(18);
var large = giveEm(24);
var xlarge = giveEm(32);*/

console.log("Actual % of Em = ", small);