export default function roomName(members: any[], me: string): string {
  return members.map(item => item.username)
    .filter(item => item !== me)
    .join(", ")
}