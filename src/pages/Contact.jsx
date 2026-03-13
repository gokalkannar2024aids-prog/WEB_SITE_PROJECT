export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Contact us</h1>
      <p className="mt-4 text-sm text-slate-600">
        Have a question about a laptop, customization, or support? Fill out the form and we&apos;ll get back to you shortly.
      </p>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Message</label>
            <textarea
              rows={4}
              placeholder="How can we help?"
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <button
            type="button"
            onClick={() => alert("Thanks for reaching out! This is a demo site.")}
            className="w-full rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
