import React, { useState } from 'react'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', form)
    alert('সাইন আপ সফল হয়েছে!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">অ্যাকাউন্ট তৈরি করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">নাম</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ইমেইল</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">সাইন আপ করুন</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
