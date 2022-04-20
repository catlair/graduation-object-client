import { Role } from '@/enums/role.enum';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const roles = currentUser && currentUser.roles,
    canAdmin = roles && roles.includes(Role.ADMIN),
    canTeacher = roles && roles.includes(Role.TEACHER),
    canViceDirector = roles && roles.includes(Role.VICE_DIRECTOR),
    canDirector = roles && roles.includes(Role.DIRECTOR),
    canSecretary = roles && roles.includes(Role.SECRETARY),
    canDirectors = canViceDirector || canDirector,
    canViewPaper = canTeacher || canDirectors || canSecretary;

  return {
    canAdmin,
    canTeacher,
    canViceDirector,
    canDirector,
    canSecretary,
    canDirectors,
    canViewPaper,
  };
}
