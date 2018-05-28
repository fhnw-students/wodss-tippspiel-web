export class NewTeam {
  public name: string;

  public static buildNewTeam(name: string): NewTeam {
    const team = new NewTeam();
    team.name = name;
    return team;
  }
}
