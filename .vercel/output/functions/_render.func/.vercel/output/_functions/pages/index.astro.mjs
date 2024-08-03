/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderSlot, b as createAstro, e as renderHead, f as renderComponent } from '../chunks/astro/server_BXFKnxSt.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const { title, color, addClass, disabled, name } = Astro2.props;
  const getColor = () => {
    switch (color) {
      case "primary":
        return "bg-blue-500 text-white";
      case "secondary":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`${getColor()} py-3 ${addClass} disabled:opacity-25`, "class")}${addAttribute(disabled ?? false, "disabled")}${addAttribute(name, "id")}> ${title} ${disabled && "..."} ${renderSlot($$result, $$slots["default"])} </button>`;
}, "/Users/darioastete/dev/projects/financial/src/components/Button.astro", void 0);

const $$Astro$2 = createAstro();
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Select;
  const { label, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-1"> <label${addAttribute(name, "for")} class="text-sm">${`${label} :`}</label> <select${addAttribute(name, "id")}${addAttribute(name, "name")} class="py-3 px-2 border shadow-md"> <option value="1">Ingreso</option> <option value="2">Gasto</option> </select> </div>`;
}, "/Users/darioastete/dev/projects/financial/src/components/Select.astro", void 0);

const $$Astro$1 = createAstro();
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Input;
  const { label, type, name } = Astro2.props;
  const getType = () => {
    switch (type) {
      case "number":
        return "number";
      case "text":
        return "text";
      default:
        return "text";
    }
  };
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-1"> <label${addAttribute(name, "for")} class="text-sm">${`${label} :`}</label> <input${addAttribute(getType(), "type")}${addAttribute(name, "id")}${addAttribute(name, "name")} class="py-2 px-2 border shadow-md"> </div>`;
}, "/Users/darioastete/dev/projects/financial/src/components/Input.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <main class="w-full py-3 px-3 min-h-screen flex flex-col"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/darioastete/dev/projects/financial/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Financial App" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-medium text-center mb-4 mt-5">Create</h1> <form class="flex flex-col gap-4 flex-grow h-full" id="registerForm" novalidate> ${renderComponent($$result2, "Select", $$Select, { "label": "Type", "name": "typeRegister" })} ${renderComponent($$result2, "Input", $$Input, { "label": "Mount", "type": "number", "name": "income" })} ${renderComponent($$result2, "Input", $$Input, { "label": "Description", "type": "text", "name": "description" })} ${renderComponent($$result2, "Button", $$Button, { "title": "Save", "color": "primary", "name": "btn-save" })} </form> ` })} `;
}, "/Users/darioastete/dev/projects/financial/src/pages/index.astro", void 0);

const $$file = "/Users/darioastete/dev/projects/financial/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
