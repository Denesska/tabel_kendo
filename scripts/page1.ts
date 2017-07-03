/**
 * Created by d.gandzii on 7/3/2017.
 */
const cars = {
    model: "BMW",
    type: "Touring",
    doors: 5,
    fuel: "gasoline",
    factYear: 1993,
    registered: true,
    age: function () {
        let y = new Date();
        return y.getFullYear() - this.factYear;
    },
    imper: "nice brand car"
};
console.log(cars.age());