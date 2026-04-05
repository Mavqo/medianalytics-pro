'use client';

import { useMemo } from 'react';
import type { NavItem, NavGroup } from '@/types';

// Demo mode: no auth checks, show all navigation items

export function useFilteredNavItems(items: NavItem[]) {
  // Demo mode: return all items without filtering
  return useMemo(() => items, [items]);
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  // Demo mode: return all groups without filtering
  return useMemo(() => groups, [groups]);
}
