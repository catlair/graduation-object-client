import { Role } from '@/enums/role.enum';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const roles = currentUser && currentUser.roles;

  return {
    canAdmin: roles?.includes(Role.ADMIN),
    canTeacher: roles?.includes(Role.TEACHER),
    canViceDirector: roles?.includes(Role.VICE_DIRECTOR),
    canDirector: roles?.includes(Role.DIRECTOR),
    canSecretary: roles?.includes(Role.SECRETARY),
    canDirectors: roles?.includes(Role.DIRECTOR) || roles?.includes(Role.VICE_DIRECTOR),
  };
}
