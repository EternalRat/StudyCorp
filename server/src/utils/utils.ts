import permissions from './permissions.json';

export default function(perm: any) {
  const permissionMap = new Map();
  for(const [ key, value ] of Object.entries(permissions)) {
    if((perm & value as any) == value as any)
      permissionMap.set(key, value);
  }
  return permissionMap;
}