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
interface Subscriber {
  quantity: number;
  lastValue: any;
  isDelayUnsubscribe: boolean;
}

export class SubscribersCollection {
  public subscribers: Record<string, Subscriber>;

  constructor() {
    this.subscribers = {};
  }

  addSubscriber(name: string) {
    if (this.subscribers[name]) {
      this.subscribers[name].quantity += 1;
    } else {
      this.subscribers[name] = {
        quantity: 1,
        lastValue: null,
        isDelayUnsubscribe: false,
      };
    }
  }

  setSubscriberValue(name: string, value: any) {
    if (this.subscribers[name]) {
      this.subscribers[name].lastValue = value;
    }
  }

  removeSubscriber(name: string) {
    if (this.has(name)) {
      this.subscribers[name].quantity -= 1;
    }
    return this.subscribers[name];
  }

  has(name: string) {
    return Boolean(this.subscribers[name]?.quantity);
  }

  get(name: string) {
    return this.subscribers[name];
  }

  setDelay(name: string, isDelay: boolean) {
    this.subscribers[name].isDelayUnsubscribe = isDelay;
  }
}
