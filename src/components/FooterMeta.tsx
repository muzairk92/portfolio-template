const FooterMeta = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-4 border-t border-faint px-6 py-6 text-xs uppercase tracking-[0.35em] text-muted lg:flex-row lg:items-center lg:justify-between lg:px-12">
      <span>© {year} Uzair Khan</span>
      <span>Crafting globally from Florida, USA</span>
    </footer>
  );
};

export default FooterMeta;
