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
                image:true
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
            by:['gender']
        });
        console.log(gendersdata)
        Result(200,false,"data",gendersdata,res)
    } catch (err) {
        console.log(err)
        Result(500, true, err.message, [], res)
    }
}


exports.getBabyNamesByLoading = async (req, res) => {
    try {
        const { skip, alphabet, gender } = req.query;
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

        const names = await prisma.BabyNames.findMany({
            skip: parseInt(skip),
            take: 30,
            where: {
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

            },

            orderBy: {
                english: 'asc',
            },
        });
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
                image:true
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
                image:true
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





