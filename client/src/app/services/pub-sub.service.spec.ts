import { TestBed } from '@angular/core/testing';
import { PubSubEvent, PubSubService } from './pub-sub.service';

describe('PubSubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubSubService = TestBed.inject(PubSubService);
    expect(service).toBeTruthy();
  });

  it('should call a subscribed function, when an event is published', () => {
    const service: PubSubService = TestBed.inject(PubSubService);

    const subscriber = jasmine.createSpy();
    service.subscribe(PubSubEvent.test, subscriber);

    service.publish(PubSubEvent.test);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it('should call all subscribed functions, when an event is published', () => {
    const service: PubSubService = TestBed.inject(PubSubService);

    const subscriber1 = jasmine.createSpy();
    const subscriber2 = jasmine.createSpy();
    service.subscribe(PubSubEvent.test, subscriber1);
    service.subscribe(PubSubEvent.test, subscriber2);

    service.publish(PubSubEvent.test);

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledTimes(1);
  });

  it('should call the subscribed function, every time an event is published', () => {
    const service: PubSubService = TestBed.inject(PubSubService);

    const subscriber = jasmine.createSpy();
    service.subscribe(PubSubEvent.test, subscriber);

    service.publish(PubSubEvent.test);
    service.publish(PubSubEvent.test);

    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('should NOT call the subscribed function, when NO event is published', () => {
    const service: PubSubService = TestBed.inject(PubSubService);

    const subscriber = jasmine.createSpy();
    service.subscribe(PubSubEvent.test, subscriber);

    expect(subscriber).toHaveBeenCalledTimes(0);
  });

  it('should NOT call the subscribed function, after getting unsubscribed from the event', () => {
    const service: PubSubService = TestBed.inject(PubSubService);

    const subscriber = jasmine.createSpy();
    const subscription = service.subscribe(PubSubEvent.test, subscriber);
    service.publish(PubSubEvent.test);

    subscription.unsubscribe();

    service.publish(PubSubEvent.test);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
