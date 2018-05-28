export class Team {
  public id: number;
  public name: string;

  public static updateTeam(team: Team, name: string): Team {
    const newTeam = new Team();
    newTeam.id = team.id;
    newTeam.name = name || team.name;
    return newTeam;
  }
}
