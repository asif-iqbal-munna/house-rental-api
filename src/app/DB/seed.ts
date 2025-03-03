import { UserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import config from '../config';

const adminUser = {
  email: 'admin@gmail.com',
  password: config.admin_password,
  name: 'Admin',
  role: UserRole.ADMIN,
};

const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ role: UserRole.ADMIN });

    if (!isAdminExist) {
      await User.create(adminUser);

      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

export default seedAdmin;
