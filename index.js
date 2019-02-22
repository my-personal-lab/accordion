window.Accordion = (function(jQuery) {

    const $ = jQuery;

    const EVENTS = {
        MOUNTED: 'accordion:mounted'
    };

    function transformToJqueryObject(target) {
        return (target instanceof jQuery) ? target : $(target);
    }

    return function _Accordion(target) {

        // If jQuery Object?
        const $accordions = transformToJqueryObject(target);

        if ($accordions.length <= 0) throw 'Please insert a Selector/HTMLElement valid';

        $accordions.each((index, accordion) => {
            const $accordion = $(accordion);
            const $accordionBody = $accordion.find('.accordion-body');
            const $accordionHeader = $accordion.find('.accordion-header');

            const options = {
                speed: 200,
                accordion: $accordion,
                accordionBody: $accordionBody
            };

            $accordionHeader.on('click', toogleDisplay({
                accordion: $accordion,
                options
            }));
        });

        // Accordion Mounted Event
        $document.on(EVENTS.MOUNTED, mounted);

        // mounted accordions
        $document.trigger(EVENTS.MOUNTED);

        function open({ speed, accordion, accordionBody }) {
            closeAll({
                speed,
                accordions: $accordions,
            });

            accordion.addClass('active');
            accordionBody.slideDown(speed);
        }

        function close({ speed, accordion, accordionBody }) {
            accordion.removeClass('active');
            accordionBody.slideUp(speed);
        }

        function closeAll({ speed, accordions }) {
            accordions.each((index, accordion) => {
                $(accordion).is('.active')
                    && close({
                        speed,
                        accordion: $(accordion),
                        accordionBody: $(accordion).find('.accordion-body')
                    });
            });
        }

        function toogleDisplay({ accordion, options }) {
            return e => accordion.is('.active')
                ? close(options)
                : open(options);
        }

        function mounted() {
            const $firstAccordion = $accordions.first();

            open({
                speed: 200,
                accordion: $firstAccordion,
                accordionBody: $firstAccordion.find('.accordion-body')
            });
        }

    };

})(jQuery);
