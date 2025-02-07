import {Directive, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs";

/**
 * A component with subscriptions.
 * <br>
 * `@Directive()` is required as the class leverages ng feature `OnDestroy`.
 * For this to compile, we must use an explicit ng decorator.
 */
@Directive()
export abstract class SubscriptionComponent implements OnDestroy {

  /**
   * TODO Link to where we first read about this pattern.
   */
  private _subscriptions: Subscription[];

  protected constructor() {
    this._subscriptions = [];
  }

  /**
   * TODO Confirm how JS/TS handles inheritance and whether this will be invoked if the child doesn't declare `implements OnDestroy`. If its the same Java, then it should be fine but I am not confident with anything JS/TS.
   */
  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Subscribe to an `Observable` and have the component handle the unsubscribing.
   * <br>
   * If you require work to be done in the subscription, use `#registerSubscription` instead.
   *
   * @param {Observable<any>} observable
   */
  public subscribe(observable: Observable<any>) {
    this._subscriptions.push(observable.subscribe())
  }

  /**
   * Register a `Subscription` to have the component handle unsubscribing.
   *
   * @param {Subscription} subscription
   */
  public registerSubscription(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

}
