import {Seeder} from '@jorgebodega/typeorm-seeding';
import {DataSource} from 'typeorm';
import {Bcrypt} from '../../../src/app/modules/shared/services/bcrypt.service';
import {AdminUserEntity} from '../../../src/app/modules/admin-users/persistence/admin-user.entity';
import {config} from '../../../src/config/app/index';

const { seeds } = config.typeorm;

export default class AdminUserSeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        const name = seeds.name;
        const email = seeds.email;
        const password = Bcrypt.hash(seeds.password);
        const audience = seeds.adminUserAudience;

        const adminUserEntity = AdminUserEntity.create(name, email, password, audience);

        try {
            await dataSource.createEntityManager().save<AdminUserEntity>(adminUserEntity);
        } catch (error) {
            console.log(' -> data already exists :)');
        }
    }
}
