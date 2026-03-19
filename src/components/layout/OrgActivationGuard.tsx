'use client';

import { useAuth, useOrganizationList } from '@clerk/nextjs';
import { useEffect } from 'react';

export function OrgActivationGuard() {
  const { orgId, isLoaded: authLoaded } = useAuth();
  const { userMemberships, setActive, isLoaded: orgLoaded } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  useEffect(() => {
    if (!authLoaded || !orgLoaded) return;
    if (orgId) return; // org already active

    const first = userMemberships.data?.[0];
    if (first) {
      setActive({ organization: first.organization.id });
    }
  }, [authLoaded, orgLoaded, orgId, userMemberships.data]);

  return null;
}
