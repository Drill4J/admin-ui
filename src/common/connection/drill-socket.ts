/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  Observable, Subject, Subscription, timer,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { mergeMap, retryWhen } from 'rxjs/operators';

import { TOKEN_KEY } from '../constants';

export interface DrillResponse {
  message: string;
  destination: string;
  type: string;
  to?: { agentId?: string; groupId?: string; buildVersion?: string };
}

export interface SubscriptionMessage {
  agentId: string;
  buildVersion: string;
}

export const genericRetryStrategy = () => (attempts: Observable<any>) =>
  attempts.pipe(mergeMap(() => timer(5000)));

export class DrillSocket {
  public ws$: WebSocketSubject<DrillResponse>;

  public subscription: Subscription;

  public onCloseEvent: (value?: CloseEvent) => void = () => {};

  public connection$: Observable<DrillResponse>;

  public reconnection$: Subject<'CLOSE' | 'OPEN'>;

  constructor(url: string) {
    this.ws$ = webSocket<DrillResponse>({
      url,
      closeObserver: {
        next: () => {
          this.onCloseEvent();
          this.reconnection$.next('CLOSE');
        },
      },
      openObserver: {
        next: () => this.reconnection$.next('OPEN'),
      },
    });
    this.connection$ = this.ws$.pipe(retryWhen(genericRetryStrategy()));

    this.subscription = this.connection$.subscribe(({ type }: DrillResponse) => {
      if (type === 'UNAUTHORIZED') {
        this.handleUnauthorized();
      }
    });
    this.reconnection$ = new Subject();
  }

  public subscribe(topic: string, callback: (arg: any) => void, message?: SubscriptionMessage | Record<string, unknown>) {
    let subscription = this.connection$.subscribe({ next: subscribe(topic, callback, message) });

    const autoSubscription = this.reconnection$.subscribe((type) => {
      if (type === 'CLOSE') {
        subscription.unsubscribe();
        this.send(topic, 'UNSUBSCRIBE', message);
      }
      if (type === 'OPEN') {
        subscription = this.connection$.subscribe({ next: subscribe(topic, callback, message) });
        this.send(topic, 'SUBSCRIBE', message);
      }
    });

    this.send(topic, 'SUBSCRIBE', message);

    return () => {
      subscription.unsubscribe();
      autoSubscription.unsubscribe();
      this.send(topic, 'UNSUBSCRIBE', message);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private handleUnauthorized() {
    localStorage.setItem(TOKEN_KEY, '');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  public send(destination: string, type: string, message?: SubscriptionMessage | Record<string, unknown>) {
    this.ws$.next({
      destination,
      type,
      message: JSON.stringify(message),
    });
  }
}

const subscribe = (topic: string, callback: (arg: any) => void, message?: SubscriptionMessage | Record<string, unknown>) => ({
  destination,
  message: responseMessage, to,
}: DrillResponse) => {
  if (destination !== topic) {
    return;
  }

  if (!to && !message) {
    callback(responseMessage || null);
    return;
  }

  const {
    agentId: subscriptionAgentId,
    buildVersion: subscriptionBuildVersion,
  } = message as SubscriptionMessage;
  const {
    agentId: messageAgentId,
    buildVersion: messageBuildVersion,
  } = to as SubscriptionMessage;
  if (
    subscriptionAgentId === messageAgentId &&
    subscriptionBuildVersion === messageBuildVersion
  ) {
    callback(responseMessage || null);
  }
};
