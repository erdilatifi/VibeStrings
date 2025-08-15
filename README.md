# 🎸 Online Guitar Shop

![Project Screenshot](./public/ProjectImg.png)

A 3-page guitar shop application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Apollo Client**.  
The app fetches data from a live **GraphQL API** and provides an elegant, responsive shopping experience with filtering, searching, and detailed guitar specs.



## 📌 Features

### Page 1 – Guitar Brands  
- Fetch and display all guitar brands from the API.  
- Selecting a brand navigates to the Models page.  

### Page 2 – Guitar Models  
- Show all guitar models for the selected brand.  
- **Search bar** – filter models by name.  
- **Filter** – narrow results by guitar type.  
- **infinite scroll**.  
- Clicking a model navigates to the Guitar Details page.  

### Page 3 – Guitar Details (Bonus Page)  
- Two-tab layout:  
  - **Specs Tab** → Guitar specifications (body wood, pickups, bridge, etc.).  
  - **Musicians Tab** → Musicians who use the guitar (2 per slide, with navigation dots).  
- Responsive UI with images and styled layouts.  

---


## 🛠️ Tech Stack

- **Next.js 15** (App Router)  
- **TypeScript**  
- **Apollo Client (GraphQL)**  
- **Tailwind CSS**  
- **shadcn/ui**  
- **React Icons**  

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/erdilatifi/guitar-shop.git
cd guitar-shop
