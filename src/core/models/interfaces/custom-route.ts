export interface IGuard {
  CanActivate(): (Promise<boolean> | boolean);
}
export interface IResolver {
  Resolve(): (Promise<void> | void);
}
