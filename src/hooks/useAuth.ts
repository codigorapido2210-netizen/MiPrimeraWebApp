import { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, UserRole } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
        if (userDoc.exists()) {
          setUser({
            id: fbUser.uid,
            ...userDoc.data()
          } as User);
        } else {
          // Fallback if doc doesn't exist yet
          setUser({
            id: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Traveler',
            role: UserRole.USER,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}
