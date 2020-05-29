interface Count {
  covered?: number;
  total: number;
}

export interface Methods {
  all?: Count;
  deleted?: Count;
  modified?: Count;
  new?: Count;
  unaffected?: Count;
}
