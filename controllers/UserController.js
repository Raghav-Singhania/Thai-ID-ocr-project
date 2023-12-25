import Info from "../db/schema.js"

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await Info.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            }, {
                new: true
            }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
    }
};


export const getUser = async (req, res) => {
    try {
        const user = await Info.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
    }
};

export const getUsers = async (req, res) => {
    try {
        const user = await Info.find();
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
    }
};

// export const getUsers = async (req, res) => {
//     try {
//         const arr = req.body.conditionsArray;
//         // const query = { $and: conditionsArray?.map(condition => ({ [condition.field]: {$in: condition.values } })) };
//         // const user = await Info.find(query);
//         console.log(req.body.conditionsArray);
//             Info.aggregate(arr).then((posts) => {
//                 if(posts==null) {
//                     res.status(404).json({
//                         message:"No data found",
//                     });
//                     return;
//                 }
//                 res.json(posts);
//             })
//             .catch((err) => {
//                 res.status(400).json(err);
//             });
        
//         // res.status(200).json(user);
//     } catch (err) {
//         console.log(err)
//     }
// };


export const deleteUser = async (req, res) => {
    try {
        await Info.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        console.log(err)
    }
};



export const createUser = async (req, res) => {
    const newUser = new Info(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.log(err)
    }
};