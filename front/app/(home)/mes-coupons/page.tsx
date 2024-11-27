import { MyCouponsList } from "@/containers/coupons/MyCouponsList";

export default async function MesCouponsPage() {
  return (
    <section className="my-24 max-w-[80%] mx-auto space-y-12">
      <MyCouponsList />
    </section>
  );
}
