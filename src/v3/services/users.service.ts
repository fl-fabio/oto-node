import users from '../../data/users.json';

export default class UsersServices {
    public static findAll = async() => {
        if (!Array.isArray(users)) {
            throw new Error('User data is not available');
        }
        return [...users];
    }

    public static findById = async(id: number) => {
        const user = users.find(u => u.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public static add = async(body: any) => {
        const newID = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;
        users.push({ ...body, id: newID });
        return users;
    }

    public static deleteById = async(id: number) => {
        const indexToDelete = users.findIndex(u => u.id === id);
        if (indexToDelete !== -1) {
            users.splice(indexToDelete, 1);
            return users;
        } else {
            throw new Error('User not found');
        }
    }

    public static readonly patchById = async(id: number, body: any) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...body };
            return users[userIndex];
        } else {
            throw new Error('User not found');
        }
    }
}