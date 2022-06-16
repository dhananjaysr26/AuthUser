import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    user_id: String,
    name: String,
    profile_pic_url: String
})

const UserData = mongoose.model('User', userSchema)
export default UserData;