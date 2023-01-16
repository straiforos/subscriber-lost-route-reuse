import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from "@angular/router";

export class RouteReuse extends BaseRouteReuseStrategy {

  constructor() {
    super();
  }

  private detachedHandles: Map<string, DetachedRouteHandle> = new Map();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (route.data['listView']) {
      return true;
    }
    return super.shouldDetach(route);
  }

  override store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {
    const key = this.getRouteKey(route);
    this.detachedHandles.set(key, detachedTree);
  }

  /**
   * Routes are stored as an array of route configs, so we can find any with url property and join them to create the URL for the route
   * @param route
   * @private
   * <br> <p>
   * [Tutorial Source](https://www.intertech.com/angular-development-10-routereusestrategy-maintaining-component-state/)
   */
  private getRouteKey(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .filter((u) => u.url)
      .map((u) => u.url)
      .join('/');
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.detachedHandles.has(this.getRouteKey(route));
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.detachedHandles.get(this.getRouteKey(route)) as DetachedRouteHandle;
  }

  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return super.shouldReuseRoute(future, curr);
  }

}
