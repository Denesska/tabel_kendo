/**
 * Created by d.gandzii on 7/3/2017.
 */
var async = require('async'),
    config = require('./config'),
    nodemailer = require('nodemailer'),
    schedule = require('node-schedule'),
    transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
            user: "p.olteanu",
            pass: "nuclear+shark+firebase.AK47"
        }
    });

(function () {
    function bdayFunc(nrDays) {
        var people = Array.prototype.slice.call(config.people),
            peopleToSendTo = people,
            bDayPerson,
            t = new Date(),
            nrDaysFromNow = t.getTime() + 1000 * 60 * 60 * 24 * nrDays;

        people.forEach(function (e, i) {
            var bday = new Date(t.getFullYear().toString() + "-" + e.bday).getTime(),
                searchDay = new Date(t.getDate() + nrDaysFromNow).getTime();

            if (bday < searchDay && searchDay < bday + 43200000) {
                bDayPerson = e;
                peopleToSendTo.splice(i, 1);
            }
        });

        if (bDayPerson) {
            async.each(peopleToSendTo, function (person, callback) {
                var Start = person.hasOwnProperty("sex") ? "Servus " : "Salut ";
                var email = Start + person.name.split(" ")[0] + ",<br><br>" +
                    "Urmeaza sa sarbatorim ziua lui <strong>" + bDayPerson.name + "</strong> in " + nrDays.toString() + " zile (" + bDayPerson.bday + ").<br><br>" +
                    "Cu aceasta ocazie Rosoftlab te invita sa ii faci o vizita colegului Paul in compania a 10 lei.<br /><br />" +
                    "Pentru mai multe detalii poti intreba pe aproape oricine din firma.";

                transporter.sendMail({
                    from: config.email.from,
                    to: person.email,
                    subject: "Zi de nastere " + bDayPerson.name,
                    html: email
                }, function(err) {
                    console.log('Sending email to ' + person.name + ' (' + person.email + ')...');
                    if (err) {
                        throw err;
                    }
                });

            }, function (err) {
                if (err) {
                    throw new Error(err);
                }
                console.log('Completed.');
            });
        }
    };

    function happyBDay() {
        debugger;
    }

    schedule.scheduleJob("0 8 * * 1-4", function () {
        bdayFunc(3);
    });

    schedule.scheduleJob("0 8 * * 4-5", function () {
        bdayFunc(4);
    });

    schedule.scheduleJob("0 8 * * 5", function () {
        bdayFunc(5);
    });
}());