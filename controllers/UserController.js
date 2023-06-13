const prisma = require("../utils/prisma");
const Result = require("../utils/utility");

exports.test = async (req, reply) => {
    return { hello: 'world' }
}
exports.getReligionsByData = async (req, res) => {
    try {
        const religionsdata = await prisma.BabyNames.groupBy({
            by: ['religionid'],
            where: {
                religionid: {
                    not: null
                }
            },
            select: {
                religionid: true,
            },
        });
        const ids = religionsdata.map((item) => item.religionid)
        const religions = await prisma.Religion.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                name: true,
                image: true
            },
            orderBy: {
                name: 'asc',
            },
        });
        console.log(religions)
        Result(200, false, "religions", religions, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, [], res)
    }

}

exports.getgenderbydata = async (req, res) => {
    try {
        const gendersdata = await prisma.BabyNames.groupBy({
            by: ['gender']
        });
        console.log(gendersdata)
        Result(200, false, "data", gendersdata, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, [], res)
    }
}


exports.getBabyNamesByLoading = async (req, res) => {
    try {
        const { skip, alphabet, gender, selected_menu, selectedid } = req.query;
        console.log(req.query)
        let where = {}
        if (selected_menu !== "HOME") {
            if (selected_menu === "RELIGION") {
                where = {
                    AND: [
                        {
                            english: {
                                startsWith: alphabet,
                            },
                        },
                        {
                            gender: {
                                in: gender
                            },
                        },
                        {
                            religionid: parseInt(selectedid)
                        }
                    ]

                }
            } else if (selected_menu === "RASHI") {
                where = {
                    AND: [
                        {
                            english: {
                                startsWith: alphabet,
                            },
                        },
                        {
                            gender: {
                                in: gender
                            },
                        },
                        {
                            rashiid: parseInt(selectedid)
                        }
                    ]

                }
            } else if (selected_menu === "NAKSHATRA") {
                where = {
                    AND: [
                        {
                            english: {
                                startsWith: alphabet,
                            },
                        },
                        {
                            gender: {
                                in: gender
                            },
                        },
                        {
                            naksathraid: parseInt(selectedid)
                        }
                    ]


                }
            }

        } else {
            where = {
                AND: [
                    {
                        english: {
                            startsWith: alphabet,
                        },
                    },
                    {
                        gender: {
                            in: gender
                        },
                    }

                ]


            }
        }
        //const {re,ra,na} = await this.getTables(religion,rashi,nakshatra);
        /*const where = {
            english: {
                startsWith: alphabet,
            },
            gender:{
                in:gender
            },
            religionid:{
                in:re
            },
            rashiid:{
                in:ra
            },
            nakshatraid:{
                in:na
            }
            
        }*/

        console.log(where)

        const names = await prisma.BabyNames.findMany({
            skip: parseInt(skip),
            take: 20,
            where,
            include: {
                religion: true,
                naksathra: true,
                rashi: true
            },
            orderBy: {
                english: 'asc',
            },
        });
        console.log(names.length)
        Result(200, false, "names", names, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)

    }

}



exports.getBabyNamesByIds = async (req, res) => {
    try {
        const { ids } = req.query;

        let values = []
        if (typeof (ids) === 'object') {
            const i = ids.map((id) => parseInt(id))
            values.push(...i)
        } else {
            values.push(parseInt(ids))
        }

        console.log(values)
        const names = await prisma.BabyNames.findMany({
            where: {
                id: {
                    in: values
                }
            },
            include: {
                religion: true,
                naksathra: true,
                rashi: true
            },
            orderBy: {
                english: 'asc',
            },
        });
        console.log(names.length)
        Result(200, false, "names", names, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)

    }

}

//get religions
exports.getReligions = async (req, res) => {
    try {
        const religions = await prisma.Religion.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        Result(200, false, "religions", religions, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)

    }

}

//get rashi
exports.getRashi = async (req, res) => {
    try {
        const rashi = await prisma.Rashi.findMany({
            select: {
                id: true,
                name: true,
                letters: true,
                image: true
            },
        });
        Result(200, false, "rashi", rashi, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)

    }

}

//get nakshatra
exports.getNakshatra = async (req, res) => {
    try {
        const nakshatra = await prisma.Naksathra.findMany({
            select: {
                id: true,
                name: true,
                letters: true,
                image: true
            },
        });
        Result(200, false, "nakshatra", nakshatra, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)
    }

}

exports.getTables = async (rashifilter, nakshtrafilter, reglisionfilter) => {

    return new Promise(async (resolve, reject) => {

        try {
            const religions = await prisma.Religion.findMany({
                where: {
                    name: { in: reglisionfilter }
                },
                select: {
                    id: true,
                },
            });

            const rashi = await prisma.Rashi.findMany({
                where: {
                    name: { in: rashifilter }
                },
                select: {
                    id: true,
                },

            });

            const nakshatra = await prisma.Nakshatra.findMany({
                where: {
                    name: { in: nakshtrafilter }
                },
                select: {
                    id: true,
                },
            });



            resolve({ re: religions.map((item) => item.id), ra: rashi.map((item) => item.id), na: nakshatra.map((item) => item.id) })
        } catch (err) {
            reject(err)
        }
    })
}

exports.getappupdate = async (req, res) => {
    try {
        const appupdate = await prisma.AppUpdate.findUnique({
            where: {
                id: 1
            }
        })
        Result(200, true, "", appupdate, res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, {}, res)
    }
}





