import { UsersUtil } from "./users-util";

export class UrlPathUtil {
  public static readonly LOGIN = "login";
  public static readonly HOME = "home";
  public static readonly TABLE_STUDENT = "table-student";
  public static readonly TABLE_ADMIN = "table-admin";
  public static readonly TABLE_TEACHER = "table-teacher";
  public static readonly PERSONAL_PAGE = "personal-page";

  public static navigateByUrlForRole() : string {
    if (localStorage.getItem(UsersUtil.ROLE) == UsersUtil.STUDENT)  { return UrlPathUtil.TABLE_STUDENT; }
    if (localStorage.getItem(UsersUtil.ROLE) == UsersUtil.ADMIN)    { return UrlPathUtil.TABLE_ADMIN; }
    if (localStorage.getItem(UsersUtil.ROLE) == UsersUtil.TEACHER)  { return UrlPathUtil.TABLE_TEACHER; }
    return "Error";
  }
}
