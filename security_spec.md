# Security Specification: TRAVEL MARKET 2026

## 1. Data Invariants
- A `Booking` must have a valid `userId` matching the authenticated user.
- A `User` profile can only be modified by the owner.
- `Cities` are read-only for standard users; only admins can modify them.
- `Favorites` must be linked to a valid `itemId` (City, Hotel, etc.).
- Timestamps (`createdAt`, `updatedAt`) must be server-generated.

## 2. The Dirty Dozen Payloads (Rejection Targets)

1. **Identity Spoofing**: Create a booking with someone else's `userId`.
2. **Privilege Escalation**: Update own user role to `ADMIN`.
3. **Ghost Field Injection**: Add `isVerified: true` to a booking.
4. **ID Poisoning**: Use a 2KB string as a `cityId`.
5. **PII Leak**: Read another user's private profile data (email/phone).
6. **Orphaned Write**: Create a booking for a non-existent city.
7. **Temporal Fraud**: Set a custom `createdAt` date in the past.
8. **Resource Exhaustion**: Send a 1MB string in a review comment.
9. **Relational Bypass**: Modify a booking status from `paid` to `refunded` without permission.
10. **State Shortcutting**: Change booking status from `cancelled` to `completed`.
11. **Mass Extraction**: List all users and their emails in a single query.
12. **Anonymous Write**: Attempt to create a city without being logged in.

## 3. Test Runner Scenarios (Conceptual)
All the above payloads MUST return `PERMISSION_DENIED`.
